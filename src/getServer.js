import { WorkingServers } from "./stores/servers";
const serves = WorkingServers();
let Server = {};
const Servidores = ["https://long-erin-mussel-veil.cyclic.cloud"];
//
let ServidoresWorking = [];
let selectServer = 0;
Server.GetWorkingServers = async () => {
  ServidoresWorking = [];
  selectServer = 0;
  for (let i = 0; i < Servidores.length; i++) {
    try {
      const response = await fetch(`${Servidores[i]}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      let data = await response.json();

      if (data.ok) {
        ServidoresWorking.push(Servidores[i]);
      }
    } catch (error) {
      console.log("No esta funcionando el servidor", Servidores[i]);
    }
  }
  if (ServidoresWorking.length == 0) {
    console.error("No Hay Servidores Disponibles");
  }
  serves.setServers(ServidoresWorking);
  console.log("ser", serves.Servers);
  return ServidoresWorking.length;
};
Server.GetServer = async () => {
  console.log("antes", serves.Servers);
  let numServidores = serves.Servers.length;
  console.log(numServidores);
  if (numServidores == 0) {
    numServidores = await Server.GetWorkingServers();
  }
  let auxselectServer = selectServer;
  selectServer++;
  if (selectServer == numServidores) {
    selectServer = 0;
  }
  if (numServidores == 0) {
    return "";
  }

  console.log("To", serves.Servers[auxselectServer]);
  console.log("server", serves.Servers);
  return serves.Servers[auxselectServer];
};
// module.exports = Server;
Server.ResetServers = () => {
  serves.setServers([]);
};
export default Server;
