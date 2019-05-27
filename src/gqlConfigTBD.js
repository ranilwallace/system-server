const { gql } = require('apollo-server-express');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    base: Information
  }

  type Information {
    _id: String,
    version: String,
    system: System,
    bios: Bios,
    baseboard: Baseboard,
    os: OS,
    versions: Versions,
    node: String,
    v8: String,
    inetLatency: Float
  }

  type System{
    manufacturer: String,
    model: String,
    version: Float,
    serial: String,
    uuid: String,
    sku: String
  }

  type Bios {
    vendor: String,
    version: String,
    releaseDate: String,
    revision: String
  }

  type Baseboard {
    manufacturer: String,
    model: String,
    version: Float,
    serial: String,
    assetTag: String
  }

  type OS {
    platform: String,
    distro: String,
    release: String,
    codename: String,
    kernel: String,
    arch: String,
    hostname: String,
    logofile: String
  }

  type Versions{
    kernel: String,
    openssl: String,
    node: String,
    v8: String,
    npm: String,
    yarn: String,
    pm2: String,
    gulp: String,
    grunt: String,
    git: String,
    tsc: String,
    mysql: String,
    redis: String,
    mongodb: String,
    nginx: String,
    php: String
  }
`;

//   type CPU{

//   }

//   type Graphics{

//   }

//   type Net{

//   }

//   type MemLayout{

//   }

//   type DiskLayout{

//   }

//   type Time{

//   }

//   type cpuCurrentspeed{

//   }

//   type Services{

//   }

//   type CurrentLoad{

//   }

//   type fsSize{

//   }

//   type Mem{

//   }

//   type NetworkConnections{

//   }

//   type NetworkStats{

//   }

//   type Temp{

//   }

//   type fsStats{

//   }

//   type DisksIO{

//   }

//   type Users{

//   }

//   type Battery{

//   }

//   type Processes{

//   }
// `;


// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    base: () => {
      return {_id: v4(), ...results};
    },
  },
};

module.exports = {
  typeDefs,
  resolvers
}