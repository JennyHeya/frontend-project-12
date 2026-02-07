$repo = 'jenny'
$commit = 'fe6dc18'
Write-Host "Listing remote heads for $repo..."
$lines = git ls-remote --heads $repo
$heads = @()
foreach ($line in $lines -split "`n") {
    $line = $line.Trim()
    if ($line -eq '') { continue }
    $parts = $line -split "`t"
    if ($parts.Count -lt 2) { continue }
    $ref = $parts[1]
    $name = $ref -replace 'refs/heads/', ''
    $heads += $name
}

foreach ($b in $heads) {
    if ($b -eq 'main') { Write-Host "Skipping main"; continue }
    Write-Host "Checking branch: $b"
    git fetch $repo $b >/dev/null 2>&1
    git merge-base --is-ancestor $commit $repo/$b
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Deleting remote branch $repo/$b (does not contain $commit)"
        git push $repo --delete $b
    } else {
        Write-Host "Keeping branch $repo/$b (contains $commit)"
    }
}
Write-Host "Done."
