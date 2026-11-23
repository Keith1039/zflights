package routes

import (
	"github.com/Keith1039/foptimize/db"
	"log"
	"os"
)

var client db.DatabaseClient

func init() {
	var err error
	client, err = db.NewDatabaseClient(os.Getenv("DB_URL"))
	if err != nil {
		log.Fatal(err)
	}
}
