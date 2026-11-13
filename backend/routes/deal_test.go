package routes_test

import (
	"bytes"
	"context"
	"encoding/json"
	"github.com/Keith1039/zflights/client"
	"github.com/Keith1039/zflights/routes"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	"net/http"
	"net/http/httptest"
	"testing"
)

func init() {
	gin.SetMode(gin.TestMode)
}

func setupDealRouter() *gin.Engine {
	router := gin.Default()
	router.GET("/deals", routes.HandleGetDeals)

	router.GET("/deals/recommend", routes.HandleGetRecommendations)

	router.POST("/deals/add", routes.HandleAssociateDeal)

	router.POST("/deals/delete", routes.HandleDissociateDeal)
	return router
}

func Test_GET_deals(t *testing.T) {
	var deals []routes.GeoDeal
	r := setupDealRouter()
	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/deals", nil)
	r.ServeHTTP(w, req)
	mBytes := w.Body.Bytes()
	assert.Equal(t, 200, w.Code)
	err := json.Unmarshal(mBytes, &deals)
	if err != nil {
		t.Fatal("Could not marshal body to GeoDeals struct")
	}
}

func Test_GET_deals_recommend(t *testing.T) {
	var deals []routes.GeoDeal
	r := setupDealRouter()
	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/deals/recommend", nil)

	// should fail if we don't give parameters
	r.ServeHTTP(w, req)
	assert.Equal(t, 400, w.Code)

	// missing limit
	w = httptest.NewRecorder()
	req, _ = http.NewRequest("GET", "/deals/recommend", nil)
	q := req.URL.Query()
	q.Add("offset", "0")
	req.URL.RawQuery = q.Encode()
	r.ServeHTTP(w, req)
	assert.Equal(t, 400, w.Code)

	// offset has to be >=0
	w = httptest.NewRecorder()
	req, _ = http.NewRequest("GET", "/deals/recommend", nil)
	q = req.URL.Query()
	q.Add("limit", "1")
	q.Add("offset", "-1")
	req.URL.RawQuery = q.Encode()
	r.ServeHTTP(w, req)
	assert.Equal(t, 400, w.Code)

	// limit has to be >= 1
	w = httptest.NewRecorder()
	req, _ = http.NewRequest("GET", "/deals/recommend", nil)
	q = req.URL.Query()
	q.Add("limit", "0")
	q.Add("offset", "0")
	req.URL.RawQuery = q.Encode()
	r.ServeHTTP(w, req)
	assert.Equal(t, 400, w.Code)

	// both present
	w = httptest.NewRecorder()
	req, _ = http.NewRequest("GET", "/deals/recommend", nil)
	q = req.URL.Query()
	q.Add("limit", "1")
	q.Add("offset", "0")
	req.URL.RawQuery = q.Encode()
	r.ServeHTTP(w, req)
	assert.Equal(t, 200, w.Code)

	//offset missing
	w = httptest.NewRecorder()
	req, _ = http.NewRequest("GET", "/deals/recommend", nil)
	q = req.URL.Query()
	q.Add("limit", "1")
	req.URL.RawQuery = q.Encode()
	r.ServeHTTP(w, req)
	assert.Equal(t, 200, w.Code)
	err := json.Unmarshal(w.Body.Bytes(), &deals)
	if err != nil {
		t.Fatal("Could not unmarshal body to GeoDeals struct")
	}
	if len(deals) != 1 {
		t.Fatalf("Expected length of 1, got %d", len(deals))
	}
}

func Test_POST_deals_adds(t *testing.T) {
	r := setupDealRouter()
	w := httptest.NewRecorder()

	req, _ := http.NewRequest("POST", "/deals/add", nil)
	r.ServeHTTP(w, req)
	assert.Equal(t, 400, w.Code)

	deals, err := client.Client.GetNonUserDeals(context.Background(), 1, 1, 0)
	if err != nil || len(deals) == 0 {
		t.Fatal("Could not get deals")
	}

	m := map[string]int{
		"deal_id": deals[0].Id,
	}
	mBytes, err := json.Marshal(m)
	if err != nil {
		t.Fatal("Could not marshal body to map")
	}
	w = httptest.NewRecorder()
	req, _ = http.NewRequest("POST", "/deals/add", bytes.NewReader(mBytes))
	assert.Equal(t, 200, w.Code)
}

func Test_POST_deals_delete(t *testing.T) {
	r := setupDealRouter()
	w := httptest.NewRecorder()

	req, _ := http.NewRequest("POST", "/deals/delete", nil)
	r.ServeHTTP(w, req)
	assert.Equal(t, 400, w.Code)

	deals, err := client.Client.GetUserDeals(context.Background(), 1)
	if err != nil || len(deals) == 0 {
		t.Fatal("Could not get deals")
	}

	m := map[string]int{
		"deal_id": deals[0].Id,
	}
	mBytes, err := json.Marshal(m)
	if err != nil {
		t.Fatal("Could not marshal body to map")
	}
	w = httptest.NewRecorder()
	req, _ = http.NewRequest("POST", "/deals/delete", bytes.NewReader(mBytes))
	assert.Equal(t, 200, w.Code)
}
