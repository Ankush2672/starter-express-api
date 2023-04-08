
module.exports = {
  accountcreated: (username, password, name) => {
    return (
        `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
           <div style="border-bottom:1px solid #eee">
              <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Welcome to Piet Transport Service</a>
           </div>
           <p style="font-size:1.1em">Hi, ${name}</p>
           <p>Your account with Piet transport Service is Successfully Created, Your login Credentials are mentioned below: </p>
           <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">USERNAME: ${username}</h2><br><hr>
           <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">PASS: ${password}</h2><br><hr>
           <p>© 2021 PIET college</p>
        </div>
     </div>`
    );
    },
    requestrejected: (name, reason) => {
      return (
          `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
          <div style="margin:50px auto;width:70%;padding:20px 0">
             <div style="border-bottom:1px solid #eee">
                <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Welcome to Piet Transport Service</a>
             </div>
             <p style="font-size:1.1em">Dear, ${name}</p>
             <p>We regret that we are unable to fulfill your request.  ${reason}</p>
             <p>© 2021 PIET college</p>
          </div>
       </div>`
      );
  }
};
