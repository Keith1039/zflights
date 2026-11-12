package middleware

import "github.com/gin-gonic/gin"

type FakeAuthHandler struct {
}

func (handler *FakeAuthHandler) Authenticate() func(c *gin.Context) {
	return func(c *gin.Context) {

	}
}
