from pathlib import Path
import re,base64,mimetypes
# Export the built homepage for review without a development server.
# Content links intentionally point to the published site; assets are embedded.
import argparse
parser=argparse.ArgumentParser(description='Export the built editorial homepage as standalone HTML.')
parser.add_argument('--dist', type=Path, default=Path('dist'))
parser.add_argument('--output', type=Path, default=Path('docs/redesign-proposals/2026-11-01-editorial-lines/preview.html'))
args=parser.parse_args()
root=args.dist.resolve()
route='index.html'
out=args.output
def asset(url):
 url=url.split('#')[0]
 p=root/url.lstrip('/')
 return 'data:'+ (mimetypes.guess_type(p)[0] or 'application/octet-stream')+';base64,'+base64.b64encode(p.read_bytes()).decode()
def css(m):
 path=root/m[1].lstrip('/')
 text=path.read_text()
 def fontface(match):
  face=match[0]
  choices=re.findall(r'url\([^)]*\.woff2?[^)]*\)\s*format\([^)]*\)',face)
  if not choices:return face
  selected=next((choice for choice in choices if '.woff2' in choice),choices[0])
  return re.sub(r'src:[^;]*;',lambda _: 'src:'+selected+';',face)
 text=re.sub(r'@font-face\{[^}]*\}',fontface,text)
 def url(m):
  value=m[1].strip('\"\'')
  if value.startswith('data:'): return m[0]
  p=(root/value.lstrip('/')) if value.startswith('/') else (path.parent/value).resolve()
  return 'url('+asset('/'+str(p.relative_to(root)))+')'
 text=re.sub(r'url\(([^)]+)\)',url,text)
 return '<style>'+text+'</style>'
h=(root/route).read_text()
h=re.sub(r'<link rel="stylesheet" href="([^"]+)"[^>]*>',css,h)
h=re.sub(r'<script src="([^"]+)"[^>]*></script>',lambda m:'<script>'+ (root/m[1].lstrip('/')).read_text().replace('</script','<\\/script')+'</script>',h)
h=re.sub(r' srcset="[^"]*"','',h)
h=re.sub(r'<img([^>]+)>',lambda m:'<img'+re.sub(r'src="([^"]+)"',lambda n:'src="'+asset(n[1])+'"',m[1]).replace('loading="lazy"','loading="eager"')+'>',h)
h=re.sub(r'(<link rel="icon" href=")([^"]+)(")',lambda m:m[1]+asset(m[2])+m[3],h)
h=re.sub(r'href="(/[^\"]*)"',lambda m:'href="https://hilmimuktitama.github.io'+m[1]+'"',h)
out.parent.mkdir(parents=True,exist_ok=True)
out.write_text(h)
print(out, out.stat().st_size)
