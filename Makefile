deploy:
	# format, set version, push dev, rebase and merge, push master
	@yarn format
	@yarn version
	@git push origin dev
	@git rebase master
	@git checkout master
	@git merge --no-ff dev
	@git push origin master
	# build, copy, commit, and push
	@yarn build
	@cp -a ./public ../deltaskelta.github.io
	@cd ../deltaskelta.github.io && git add -A && git commit -m "deploy"
	@cd ../deltaskelta.github.io && git push origin master
