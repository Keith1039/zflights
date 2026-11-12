package config

import "os"

type ConfigData struct {
	DbUrl string
}

var Config ConfigData

func init() {
	Config = ConfigData{
		DbUrl: os.Getenv("DB_URL"),
	}
}
