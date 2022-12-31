﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace TestDataNetCoreBlocklyAPI.Controllers
{
    
    
    [Route("api/[controller]/[action]")]
    public class RestrictedAccessController : ControllerBase
    {
        [HttpGet]
        [Authorize(Policy = "CustomBearer")]
        public IActionResult CustomJWT()
        {
            return Ok("you can see a secret message that requires JWT authorization");
        }

        [HttpGet]
        [Authorize(Policy = "Auth0Policy")]
        public IActionResult Auth0Secret()
        {
            return Ok("AUth0:secret message that requires JWT authorization from Auth0");
        }

        [HttpPost]
        [Authorize(Policy = "Auth0Policy")]
        public IActionResult Auth0SecretPost()
        {
            return Ok("POST AUth0:secret message that requires JWT authorization from Auth0");
        }

        [HttpGet]
        [Authorize(Policy = "CustomBearer")]
        public IActionResult CustomJWTPost()
        {
            return Ok("POST: you can see a secret message that requires JWT authorization");
        }
    }
}
