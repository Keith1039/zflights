package routes_test

import (
	"bytes"
	"encoding/json"
	"github.com/Keith1039/zflights/routes"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	"net/http"
	"net/http/httptest"
	"testing"
)

func setupUserRouter() *gin.Engine {
	router := gin.Default()
	// user routes
	router.POST("/settings/general/update", routes.HandleUpdateGeneralConfig)

	router.POST("/settings/email/update", routes.HandleUpdateEmailConfig)
	return router
}

func Test_POST_settings_update_general(t *testing.T) {
	r := setupUserRouter()
	w := httptest.NewRecorder()

	req, _ := http.NewRequest("POST", "/settings/general/update", nil)
	r.ServeHTTP(w, req)
	assert.Equal(t, 400, w.Code)

	// only has threshold
	m := map[string]any{
		"threshold": 0,
	}
	mBytes, err := json.Marshal(m)
	if err != nil {
		t.Fatal("failed to marshal JSON")
	}
	w = httptest.NewRecorder()
	req, _ = http.NewRequest("POST", "/settings/general/update", bytes.NewReader(mBytes))
	r.ServeHTTP(w, req)
	assert.Equal(t, 400, w.Code)

	// missing departure airports
	m = map[string]any{
		"threshold":            10,
		"interested_countries": []string{},
	}
	mBytes, err = json.Marshal(m)
	if err != nil {
		t.Fatal("failed to marshal JSON")
	}
	w = httptest.NewRecorder()
	req, _ = http.NewRequest("POST", "/settings/general/update", bytes.NewReader(mBytes))
	r.ServeHTTP(w, req)
	assert.Equal(t, 400, w.Code)

	// threshold < 0
	m = map[string]any{
		"threshold":            0,
		"interested_countries": []string{},
		"departure_airports":   []string{},
	}
	mBytes, err = json.Marshal(m)
	if err != nil {
		t.Fatal("failed to marshal JSON")
	}
	w = httptest.NewRecorder()
	req, _ = http.NewRequest("POST", "/settings/general/update", bytes.NewReader(mBytes))
	r.ServeHTTP(w, req)
	assert.Equal(t, 400, w.Code)

	// threshold > 0
	m = map[string]any{
		"threshold":            101,
		"interested_countries": []string{},
		"departure_airports":   []string{},
	}
	mBytes, err = json.Marshal(m)
	if err != nil {
		t.Fatal("failed to marshal JSON")
	}
	w = httptest.NewRecorder()
	req, _ = http.NewRequest("POST", "/settings/general/update", bytes.NewReader(mBytes))
	r.ServeHTTP(w, req)
	assert.Equal(t, 400, w.Code)

	// len departure airports > 3
	m = map[string]any{
		"threshold":            100,
		"interested_countries": []string{},
		"departure_airports":   []string{"", "", "", ""},
	}
	mBytes, err = json.Marshal(m)
	if err != nil {
		t.Fatal("failed to marshal JSON")
	}
	w = httptest.NewRecorder()
	req, _ = http.NewRequest("POST", "/settings/general/update", bytes.NewReader(mBytes))
	r.ServeHTTP(w, req)
	assert.Equal(t, 400, w.Code)

	// len departure airports > 3
	m = map[string]any{
		"threshold":            10,
		"interested_countries": []string{},
		"departure_airports":   []string{"", "", ""},
	}
	mBytes, err = json.Marshal(m)
	if err != nil {
		t.Fatal("failed to marshal JSON")
	}
	w = httptest.NewRecorder()
	req, _ = http.NewRequest("POST", "/settings/general/update", bytes.NewReader(mBytes))
	r.ServeHTTP(w, req)
	assert.Equal(t, 200, w.Code)
}

func Test_POST_settings_update_email(t *testing.T) {
	r := setupUserRouter()
	w := httptest.NewRecorder()

	req, _ := http.NewRequest("POST", "/settings/email/update", nil)
	r.ServeHTTP(w, req)
	assert.Equal(t, 400, w.Code)

	// missing batch type
	m := map[string]any{
		"subscribed": false,
	}
	mBytes, err := json.Marshal(m)
	if err != nil {
		t.Fatal("failed to marshal JSON")
	}
	w = httptest.NewRecorder()
	req, _ = http.NewRequest("POST", "/settings/email/update", bytes.NewReader(mBytes))
	r.ServeHTTP(w, req)
	assert.Equal(t, 400, w.Code)

	// missing subscribed
	m = map[string]any{
		"batch_type": "NO_BATCH",
	}
	mBytes, err = json.Marshal(m)
	if err != nil {
		t.Fatal("failed to marshal JSON")
	}
	w = httptest.NewRecorder()
	req, _ = http.NewRequest("POST", "/settings/email/update", bytes.NewReader(mBytes))
	r.ServeHTTP(w, req)
	assert.Equal(t, 400, w.Code)

	// missing subscribed
	m = map[string]any{
		"subscribed": true,
		"batch_type": "NO_BATCH",
	}
	mBytes, err = json.Marshal(m)
	if err != nil {
		t.Fatal("failed to marshal JSON")
	}
	w = httptest.NewRecorder()
	req, _ = http.NewRequest("POST", "/settings/email/update", bytes.NewReader(mBytes))
	r.ServeHTTP(w, req)
	assert.Equal(t, 200, w.Code)

}
