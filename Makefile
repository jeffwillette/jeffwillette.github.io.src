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
	@git merge dev
	# push master
	@git push origin master
	# build, copy, commit, and push
	@yarn build
	# copy to github.io repo
	@cp -a ./public/* ../jeffwillette.github.io
	# add and commit
	@cd ../jeffwillette.github.io && git add -A && git commit -m "deploy"
	# push to master
	@cd ../jeffwillette.github.io && git push origin master
	# checkout dev
	@git checkout dev

gen:
	@yarn get-schema
	@yarn gatsby-gen
	@yarn gen
