#!/bin/bash
# Remove non-inset box-shadows (keep inset for subtle depth)
sed -i '/box-shadow:/ { /inset/! s/.*/    \/\* INDUSTRIAL: Depth via borders, not shadows \*\//; }' style.css
echo "✅ Box shadows removed (kept inset)"
