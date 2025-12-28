#!/bin/bash
export VITE_SUPABASE_URL="https://uvoikabnkjfvcccjeypi.supabase.co"
export VITE_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2b2lrYWJua2pmdmNjY2pleXBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0OTE2OTYsImV4cCI6MjA3NzA2NzY5Nn0.-FyNBGXcf7RHIV3wiI5nMeZsH5ifwpWslNPfTtTJK-M"

cd /Users/alan/Code/mmos/app

minds=(
  naval_ravikant
  marty_cagan
  thiago_finch
  sam_altman
  steven_pinker
  academia_lendaria
  kapil_gupta
  cadu_souza
  steve_jobs
  jon_benson
  abilio_diniz
  gary_halbert
  pedro_valerio
  rafa_medeiros
  jesus_cristo
  alex_hormozi
  seth_godin
  cagan_patton
  dan_kennedy
  eugene_schwartz
  russel_brunson
  yuval_harari
  gary_vee
  peter_thiel
  jeff_patton
  napoleon_hill
  mark_manson
  daniel_kahneman
  leonardo_da_vinci
  dan_koe
  ray_kurzweil
  alan_nicolas
  roger_medke
  paul_graham
  joao_lozano
)

for slug in "${minds[@]}"; do
  echo "=== Processing: $slug ==="
  node scripts/import-mind-sources.mjs "$slug" 2>&1 | grep -E "(Found|Created|Imported|Skipped|Errors|not found|Total)" || true
  echo ""
done
