# Profile Website

Single-page personal site in plain HTML, CSS and JavaScript, deployed to GitHub Pages with GitHub Actions.

## Structure
- `css/theme.css`: all colours, fonts, spacing (variables only). Edit this to re-theme.
- `css/style.css`: layout and components, uses `var()` only.
- `js/main.js`: nav, scroll effects, flip cards, lightbox.
- `.github/workflows/`: validate, deploy, pr-checks, lighthouse, notify.

## Git flow
`main` <- `develop` <- `feature/*`, `theme/*`, `ci/*` (PRs only, one peer review each).

## Theme exercise
```
git checkout -b theme/dark-mode
# edit ONLY css/theme.css
git add css/theme.css && git commit -m "Switch to dark theme"
git push origin theme/dark-mode
```
Open a PR, get a review, merge. The deploy workflow publishes it.
