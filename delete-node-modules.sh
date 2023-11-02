# Apague o node_modules no diretório raiz
rm -rf ./node_modules
# Apague o pnpm-lock.yaml no diretório raiz
rm -rf ./pnpm-lock.yaml
# Apagua todos os node_modules nos subdiretórios
find . -name "node_modules" -type d -prune -exec rm -rf '{}' +