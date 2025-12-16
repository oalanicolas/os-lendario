#!/bin/bash

OUTPUT_DIR="/Users/alan/Code/mmos/public/minds-profile-images"

# Function to try downloading with fallback
try_download() {
  local slug=$1
  shift
  local urls=("$@")
  
  for url in "${urls[@]}"; do
    echo "Trying $slug from: $(echo $url | cut -d'/' -f1-3)/..."
    if curl -L -s -A "Mozilla/5.0" -o "${OUTPUT_DIR}/${slug}.jpg" "$url" 2>/dev/null; then
      size=$(stat -f%z "${OUTPUT_DIR}/${slug}.jpg" 2>/dev/null || stat -c%s "${OUTPUT_DIR}/${slug}.jpg" 2>/dev/null)
      if [ $size -gt 5000 ]; then
        echo "✓ Downloaded ${slug} (${size} bytes)"
        return 0
      fi
    fi
  done
  echo "✗ Failed to download ${slug}"
  return 1
}

# Alex Hormozi
try_download "alex_hormozi" \
  "https://pbs.twimg.com/profile_images/1445559984676020227/B8rDGJk5_400x400.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/8/8c/Alex_Hormozi_2023.jpg"

# Russell Brunson  
try_download "russel_brunson" \
  "https://pbs.twimg.com/profile_images/1445544235614666758/kS5M8EGi_400x400.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/3/3e/Russell_Brunson.jpg"

# Rick and Morty
try_download "ricky_and_morty" \
  "https://upload.wikimedia.org/wikipedia/en/2/28/Rick_and_Morty_season_1.jpg" \
  "https://upload.wikimedia.org/wikipedia/en/a/a6/Rick_and_Morty_title_card.png"

