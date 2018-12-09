this is for a post about how to mount a docker volume in a container using the go sdk. It is not very obvious from the docs

	resp, err := cli.ContainerCreate(
		context.Background(),
		&container.Config{
			Image: id,
		},
		&container.HostConfig{
			Mounts: []mount.Mount{
				mount.Mount{
					Target:   "/var/lib/mysql",
					Source:   "youshowprocom_mysql-test",
					Type:     "volume",
					ReadOnly: false,
				},
			},
		},
		&network.NetworkingConfig{},
		"fucker",
	)

