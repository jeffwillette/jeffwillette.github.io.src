deploy:
	# format
	@yarn format
	# version
	@yarn version
	# push dev
	@git push origin dev
	# rebase
	@git rebase master
	# checkout master
	@git checkout master
	# merge dev
	@git merge --no-ff dev
	# push master
	@git push origin master
	# build, copy, commit, and push
	@yarn build
	# copy to github.io repo
	@cp -a ./public/* ../deltaskelta.github.io
	# add and commit
	@cd ../deltaskelta.github.io && git add -A && git commit -m "deploy"
	# push to master
	@cd ../deltaskelta.github.io && git push origin master
	# checkout dev
	@git checkout dev

gen:
	@yarn get-schema
	@yarn gatsby-gen
	@yarn gen
