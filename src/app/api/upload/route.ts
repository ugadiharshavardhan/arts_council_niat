import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const BUCKET_NAME = "arts-council";

function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const serviceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "";

  if (!supabaseUrl || !serviceKey) {
    throw new Error("Supabase credentials not configured on server");
  }

  return createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false },
  });
}

/**
 * Helper to extract storage object path from a Supabase public URL.
 * URL format: https://<project>.supabase.co/storage/v1/object/public/arts-council/<folder>/<filename>
 */
function extractStoragePathFromUrl(url: string, bucket = BUCKET_NAME): string | null {
  if (!url || typeof url !== "string") return null;
  const marker = `/storage/v1/object/public/${bucket}/`;
  const idx = url.indexOf(marker);
  if (idx !== -1) {
    return decodeURIComponent(url.substring(idx + marker.length));
  }
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "uploads";
    const oldImageUrl = formData.get("oldImageUrl") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const supabaseAdmin = getSupabaseAdmin();

    // 1. Ensure bucket exists and is public
    try {
      const { data: buckets } = await supabaseAdmin.storage.listBuckets();
      const bucketExists = buckets?.some((b) => b.name === BUCKET_NAME);
      if (!bucketExists) {
        await supabaseAdmin.storage.createBucket(BUCKET_NAME, {
          public: true,
          fileSizeLimit: 10485760, // 10MB
        });
      }
    } catch (bucketErr) {
      console.warn("Bucket check warning:", bucketErr);
    }

    // 2. If an old Supabase image URL was provided, delete the old file to prevent storage bloat
    if (oldImageUrl) {
      const oldPath = extractStoragePathFromUrl(oldImageUrl);
      if (oldPath) {
        try {
          await supabaseAdmin.storage.from(BUCKET_NAME).remove([oldPath]);
          console.log(`Deleted old storage file: ${oldPath}`);
        } catch (delErr) {
          console.warn("Failed to delete old image from storage:", delErr);
        }
      }
    }

    // 3. Prepare file data and unique path
    const buffer = Buffer.from(await file.arrayBuffer());
    const rawName = file.name || "image.jpg";
    const cleanName = rawName.replace(/[^a-zA-Z0-9._-]/g, "_");
    const uniqueId = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
    const storagePath = `${folder}/${uniqueId}-${cleanName}`;

    // 4. Upload file to Supabase storage
    const { data, error } = await supabaseAdmin.storage
      .from(BUCKET_NAME)
      .upload(storagePath, buffer, {
        contentType: file.type || "image/jpeg",
        upsert: true,
      });

    if (error) {
      console.error("Supabase storage upload error:", error);
      return NextResponse.json(
        { error: `Upload failed: ${error.message}` },
        { status: 500 }
      );
    }

    // 5. Get public URL
    const { data: publicData } = supabaseAdmin.storage
      .from(BUCKET_NAME)
      .getPublicUrl(storagePath);

    return NextResponse.json({
      success: true,
      url: publicData.publicUrl,
      path: storagePath,
      bucket: BUCKET_NAME,
    });
  } catch (err: any) {
    console.error("Upload API handler error:", err);
    return NextResponse.json(
      { error: err?.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    let imageUrl = searchParams.get("url");

    if (!imageUrl) {
      const body = await req.json().catch(() => ({}));
      imageUrl = body.imageUrl || body.url;
    }

    if (!imageUrl) {
      return NextResponse.json(
        { error: "Image URL is required" },
        { status: 400 }
      );
    }

    const path = extractStoragePathFromUrl(imageUrl);
    if (!path) {
      // Not a Supabase storage URL, skip safely
      return NextResponse.json({
        success: true,
        message: "Not a Supabase storage URL, no action required",
      });
    }

    const supabaseAdmin = getSupabaseAdmin();
    const { error } = await supabaseAdmin.storage
      .from(BUCKET_NAME)
      .remove([path]);

    if (error) {
      return NextResponse.json(
        { error: `Failed to delete from storage: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, deletedPath: path });
  } catch (err: any) {
    console.error("Storage delete error:", err);
    return NextResponse.json(
      { error: err?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
