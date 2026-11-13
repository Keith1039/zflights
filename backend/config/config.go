package config

import (
	"fmt"
	"os"
)

type ConfigData struct {
	DbUrl string
}

var Config ConfigData

func init() {
	Config = ConfigData{
		DbUrl: os.Getenv("DB_URL"),
	}
	fmt.Println("db url: ", Config.DbUrl)
}
