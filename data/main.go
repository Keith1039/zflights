package main

import (
	"context"
	"encoding/json"
	"github.com/Keith1039/foptimize/bridge"
	"github.com/Keith1039/foptimize/db"
	"github.com/Keith1039/foptimize/schema"
	"io"
	"log"
	"math/rand/v2"
	"os"
)

var c db.DatabaseClient
var defaultUser, otherUser schema.User

// init client and make user
func init() {
	ctx := context.Background()
	var err error
	url := "postgres://postgres:password@pgtestdb:5432/postgres?sslmode=disable"
	c, err = db.NewDatabaseClient(url)
	if err != nil {
		log.Fatal(err)
	}
	defaultUser = schema.User{
		Email:               "some_email@gmail.com",
		RelevantAirports:    []string{"YYW", "YOZ"},
		SubscribedCountries: []string{},
		Config:              schema.Config{},
		EmailConfig:         schema.EmailConfig{},
		Threshold:           0,
	}
	otherUser = schema.User{
		Email:               "some_other_email@gmail.com",
		RelevantAirports:    []string{"YYW", "YOZ"},
		SubscribedCountries: []string{},
		Config:              schema.Config{},
		EmailConfig:         schema.EmailConfig{},
		Threshold:           0,
	}
	id, err := c.AddUser(ctx, defaultUser)
	if err != nil {
		log.Fatal(err)
	}
	defaultUser.Id = id
	id, err = c.AddUser(ctx, otherUser)
	if err != nil {
		log.Fatal(err)
	}
	otherUser.Id = id
}

func main() {
	ctx := context.Background()
	path := "./deals.json"
	f, err := os.Open(path)
	if err != nil {
		log.Fatal(err)
	}
	defer f.Close()

	bytes, err := io.ReadAll(f)
	if err != nil {
		log.Fatal(err)
	}
	m := make(map[string]any)
	err = json.Unmarshal(bytes, &m)
	if err != nil {
		log.Fatal(err)
	}

	deals, err := bridge.ParseDeals(m)
	if err != nil {
		log.Fatal(err)
	}

	countryMap := make(map[string]bool)
	notIntrestedCountryMap := make(map[string]bool)

	for _, deal := range deals {
		if ok := countryMap[deal.Country]; ok {
			continue
		}
		if ok := notIntrestedCountryMap[deal.Country]; ok {
			continue
		}
		if rand.IntN(100) < 50 {
			countryMap[deal.Country] = true
		} else {
			notIntrestedCountryMap[deal.Country] = true
		}
	}

	for country := range countryMap {
		defaultUser.SubscribedCountries = append(defaultUser.SubscribedCountries, country)
	}
	for country := range notIntrestedCountryMap {
		otherUser.SubscribedCountries = append(otherUser.SubscribedCountries, country)
	}
	err = c.UpdateUser(ctx, defaultUser)
	if err != nil {
		log.Fatal(err)
	}
	err = c.UpdateUser(ctx, otherUser)
	if err != nil {
		log.Fatal(err)
	}

	_, err = c.SaveDeals(ctx, defaultUser.Id, deals)
	if err != nil {
		log.Fatal(err)
	}
	_, err = c.SaveDeals(ctx, otherUser.Id, deals)
	if err != nil {
		log.Fatal(err)
	}
}
