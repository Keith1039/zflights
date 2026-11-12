package client

import (
	"github.com/Keith1039/foptimize/db"
	"github.com/Keith1039/zflights/config"
	"log"
)

var Client db.DatabaseClient

func init() {
	var err error
	Client, err = db.NewDatabaseClient(config.Config.DbUrl)
	if err != nil {
		log.Fatal(err)
	}
}
