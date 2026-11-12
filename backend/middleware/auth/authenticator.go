package middleware

import "github.com/gin-gonic/gin"

type Authenticator interface {
	Authenticate() func(c *gin.Context)
}
