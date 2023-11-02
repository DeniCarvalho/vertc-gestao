for dir in $(find . -name "package.json" -not -path "./node_modules/*" | xargs -n 1 dirname); do
    # Verifica se "dependencies" e "react" estão no package.json
    if grep -q "\"dependencies\":" "$dir/package.json" && grep -A 20 "\"dependencies\":" "$dir/package.json" | grep -q "\"react\":"; then
        echo "$dir"
        grep "\"react\":" "$dir/package.json"
        echo "----------"
    fi
done