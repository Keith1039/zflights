package geo

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"strconv"
)

const jsonUrl = "https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/refs/heads/master/json/countries%2Bstates%2Bcities.json"

var geoData map[string]map[string][2]float64
var countryLatLng map[string][2]float64

// I cannot be bothered to properly type this, we raw dogging this
func init() {
	geoData = make(map[string]map[string][2]float64)
	countryLatLng = make(map[string][2]float64)
	var container []map[string]any
	resp, err := http.Get(jsonUrl)
	if err != nil {
		log.Fatalf("failed to fetch URL: %v", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		log.Fatalf("bad status: %s", resp.Status)
	}

	// Read all bytes from the response body
	bodyBytes, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Fatalf("failed to read response body: %v", err)
	}
	err = json.Unmarshal(bodyBytes, &container)
	if err != nil {
		log.Fatalf("failed to unmarshal JSON: %v", err)
	}
	for _, rawGeoData := range container {
		cityMap := make(map[string][2]float64)
		countryName := rawGeoData["name"].(string)
		latitude, err := strconv.ParseFloat(rawGeoData["latitude"].(string), 64)
		if err != nil {
			log.Fatalf("failed to parse country latitude %s: %v", countryName, err)
		}
		longitude, err := strconv.ParseFloat(rawGeoData["latitude"].(string), 64)
		if err != nil {
			log.Fatalf("failed to parse country longitude %s: %v", countryName, err)
		}
		countryLatLng[countryName] = [2]float64{latitude, longitude}
		states := rawGeoData["states"].([]interface{})
		for _, state := range states {
			realState := state.(map[string]any)
			cities := realState["cities"].([]interface{})
			for _, city := range cities {
				realCity := city.(map[string]interface{})
				cityName := realCity["name"].(string)
				latitude, err = strconv.ParseFloat(realCity["latitude"].(string), 64)
				if err != nil {
					log.Fatalf("failed to parse latitude: %v", err)
				}
				longitude, err = strconv.ParseFloat(realCity["longitude"].(string), 64)
				if err != nil {
					log.Fatalf("failed to parse longitude: %v", err)
				}
				cityMap[cityName] = [2]float64{latitude, longitude}
			}
		}
		geoData[countryName] = cityMap
	}
}

// should work with towns and settlments
func GetLatLng(country, city string) ([2]float64, error) {
	latLng, ok := geoData[country][city]
	if !ok {
		fmt.Printf("no geolocation for country %s and city %s, using fallback\n", country, city)
		latLng, ok = countryLatLng[country]
		if !ok {
			return [2]float64{}, fmt.Errorf("no geolocation for country %s, fallback unsuccesful skipping", country)
		}
		return latLng, nil
	}
	return latLng, nil
}
