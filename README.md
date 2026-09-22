# proprails.co.za

The Prop Rails website. Static HTML, no build step, no dependencies, no third-party scripts, no analytics and no
cookies. Served by GitHub Pages at <https://proprails.co.za>.

## Running it locally

Any static server will do:

```bash
python -m http.server 4173
```

Then open <http://127.0.0.1:4173>.

## Pages

| File | What it is |
|---|---|
| `index.html` | Homepage |
| `platform.html` | Pilot / watch / bench operating modes and current venue coverage |
| `benchmark.html` | The OKX demo benchmark: results, method and caveats |
| `security.html` | Permission model and operational controls |
| `contact.html` | Pilot enquiry (opens the visitor's mail client; falls back to a copyable message) |
| `privacy.html` | Privacy note |
| `404.html` | Not-found page |

## House rules for anyone editing this

**Numbers.** Every latency figure on `index.html` and `benchmark.html` is derived from the published benchmark
database in [prop-rails-okx-benchmark](https://github.com/tkariwo/prop-rails-okx-benchmark) — benchmark
`bn_01a0abad34a30916f5` — using the same linear-interpolation percentile function as that repository's
`reproduce.py`. Last verified 22 September 2026. **If you change a number here, re-derive it from the database
first.** The point of this site is that its claims can be checked; a figure nobody can reproduce undoes that.

**Illustrations.** The "risk execution console" in the homepage hero is an interface mock-up with sample values.
It carries a visible `Illustrative` label and a caption saying so — keep both. Everything else that looks like
real output *is* real output: the chart is the benchmark's own, and the pilot terminal shows an actual recorded
run, including the unexciting parts.

**Contact form.** It submits nowhere. It assembles a message in the browser, tries to open the visitor's mail
client, and always offers the text to copy in case no mail client exists. Keep it that way — no third-party form
processor.

## Licence

© 2026 Prop Rails. All rights reserved. The content and design of this site are not licensed for reuse.
