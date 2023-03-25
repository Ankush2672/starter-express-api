const modals = require('../../config').modals;

module.exports = {
    add_bus_route: async (req,res)=>{

        try{
            res.send("world")
        }catch(error)
        {
            console.log("add bus route error : ",error);
        }
    },
    get_bus_route: async (req,res)=>{

        try{
            let bus_routes = await modals.routes.find({});
            console.log(bus_routes);
            res.send("hello");
        }catch(error)
        {
            console.log("get bus route error", error);
        }
        
    },
}
