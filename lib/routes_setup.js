module.exports = routesSetup

function routesSetup(server, conf) {

    conf.forEach(function (route) {

        var routeType = undefined

        switch (route.type.toUpperCase()) {

            case 'GET': routeType = 'get'; break

            case 'POST': routeType = 'post'; break

            case 'PUT': routeType = 'put'; break

            case 'DELETE': routeType = 'delete'; break

        }

        if (routeType !== undefined) {

            server[routeType](route.path, handler)

            function handler (req, res) {
                res.json(route.response)
            }

        }

    })

}