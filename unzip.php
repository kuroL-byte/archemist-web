<?php
/**
 * Hostinger 1-Click Fast Extractor for ARCHEMIST Web
 * Solves the hPanel File Manager 500 Internal Error
 */
ini_set('display_errors', 1);
error_reporting(E_ALL);

$zipCandidates = ['dist.zip', 'dist-ready.zip', 'archemist-dist.zip'];
$targetZip = null;

foreach ($zipCandidates as $candidate) {
    if (file_exists(__DIR__ . '/' . $candidate)) {
        $targetZip = $candidate;
        break;
    }
}

if (!$targetZip) {
    die('<div style="font-family:sans-serif;padding:30px;background:#fff3cd;color:#856404;border-radius:10px;margin:50px auto;max-width:600px;">
        <h2>Zip File Not Found</h2>
        <p>Please ensure <strong>dist.zip</strong> or <strong>dist-ready.zip</strong> is uploaded in the same folder as this <code>unzip.php</code> file (inside <code>public_html</code>).</p>
    </div>');
}

$zip = new ZipArchive;
$res = $zip->open(__DIR__ . '/' . $targetZip);

if ($res === TRUE) {
    $zip->extractTo(__DIR__);
    $zip->close();

    // If files were extracted into a "dist" subfolder, move them to current directory
    if (is_dir(__DIR__ . '/dist')) {
        $files = scandir(__DIR__ . '/dist');
        foreach ($files as $file) {
            if ($file !== '.' && $file !== '..') {
                $src = __DIR__ . '/dist/' . $file;
                $dest = __DIR__ . '/' . $file;
                if (file_exists($dest)) {
                    if (is_dir($dest)) {
                        // Merge or replace directory
                        rename($src, $dest . '_tmp');
                    } else {
                        unlink($dest);
                        rename($src, $dest);
                    }
                } else {
                    rename($src, $dest);
                }
            }
        }
        @rmdir(__DIR__ . '/dist');
    }

    echo '<!DOCTYPE html>
    <html>
    <head>
        <title>Deployment Successful — ARCHEMIST</title>
        <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #070B14; color: #fff; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
            .card { background: #0F172A; border: 1px solid #1E293B; border-radius: 20px; padding: 40px; max-width: 520px; text-align: center; box-shadow: 0 20px 50px rgba(0,0,0,0.5); }
            h1 { color: #38BDF8; font-size: 24px; margin-bottom: 12px; }
            p { color: #94A3B8; font-size: 15px; line-height: 1.6; margin-bottom: 24px; }
            .btn { display: inline-block; background: #0284C7; color: white; padding: 12px 28px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 14px; transition: background 0.2s; }
            .btn:hover { background: #0369A1; }
            .note { font-size: 12px; color: #64748B; margin-top: 20px; font-family: monospace; }
        </style>
    </head>
    <body>
        <div class="card">
            <h1>Deployment Complete!</h1>
            <p>All files from <strong>' . htmlspecialchars($targetZip) . '</strong> were successfully extracted directly into <code>public_html/</code>.</p>
            <a href="/" class="btn">View Live Website &rarr;</a>
            <p class="note">Security tip: You can now delete <strong>unzip.php</strong> and <strong>' . htmlspecialchars($targetZip) . '</strong> from your File Manager.</p>
        </div>
    </body>
    </html>';
} else {
    echo '<div style="font-family:sans-serif;padding:30px;background:#f8d7da;color:#721c24;border-radius:10px;margin:50px auto;max-width:600px;">
        <h2>Extraction Failed</h2>
        <p>Could not open ' . htmlspecialchars($targetZip) . '. Error code: ' . $res . '</p>
    </div>';
}
?>
