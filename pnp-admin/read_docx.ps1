Add-Type -AssemblyName 'System.IO.Compression.FileSystem'

$files = @(
    "..\PNP databse.docx",
    "..\PNP_Backend_Admin_Reference.docx"
)

foreach ($file in $files) {
    Write-Host "===== FILE: $file ====="
    $fullPath = Resolve-Path $file
    $zip = [System.IO.Compression.ZipFile]::OpenRead($fullPath)
    $entry = $zip.Entries | Where-Object { $_.Name -eq 'document.xml' }
    $stream = $entry.Open()
    $reader = New-Object System.IO.StreamReader($stream)
    $content = $reader.ReadToEnd()
    $reader.Close()
    $stream.Close()
    $zip.Dispose()
    $text = $content -replace '<[^>]+>', ' ' -replace '\s+', ' '
    Write-Host $text
    Write-Host ""
}
