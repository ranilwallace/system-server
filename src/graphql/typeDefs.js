const { gql } = require('apollo-server-express');

// Construct a schema, using GraphQL schema language
exports.typeDefs = gql`
  scalar IntToString

  type Query {
    systemInformation: Information
  }

  type Information {
    _id: String,
    version: String,
    system: System,
    bios: Bios,
    baseboard: Baseboard,
    os: OS,
    versions: Versions,
    cpu: CPU,
    graphics: Graphics,
    net: [Network],
    memLayout: [MemoryLayout],
    diskLayout: [DiskLayout],
    time: Time,
    cpuCurrentspeed: CpuCurrentspeed,
    temp: Temp,
    services: [Services],
    currentLoad: CurrentLoad,
    fsSize: [fsSize],
    mem: Mem,
    networkConnections: [NetworkConnections],
    networkStats: NetworkStats,
    fsStats: fsStats,
    disksIO: DisksIO,
    users: [Users],
    battery: Battery,
    processes: Processes,
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

  type CPU{
    manufacturer: String,
    brand: String,
    vendor: String,
    family: String,
    model: String,
    stepping: String,
    revision: String,
    voltage: String,
    speed: String,
    speedmin: String,
    speedmax: String,
    cores: Int,
    cache: [String],
    flags: String
  }

  type Graphics{
    controllers: [Controller],
    displays: [Display]
  }

  type Controller{
    model: String,
    bus: String,
    vram: String,
    vramDynamic: Boolean,
    vendor: String
  }

  type Display{
    model: String,
    main: Boolean,
    builtin: Boolean,
    connection: String,
    sizex: Int,
    sizey: Int,
    resolutionx: Int,
    resolutiony: Int
  }

  type Network{
    iface: String,
    ip4: String,
    ip6: String,
    mac: String,
    internal: Boolean
  }

  type MemoryLayout{
    size: IntToString,
    bank: String,
    type: String,
    clockSpeed: Int,
    formFactor: String,
    manufacturer: String,
    partNum: String,
    serialNum: String,
    voltageConfigured: Int,
    voltageMin: Int,
    voltageMax: Int
  }

  type DiskLayout{
    type: String,
    name: String,
    vendor: String,
    size: IntToString,
    bytesPerSector: Int,
    totalCylinders: Int,
    totalHeads: Int,
    totalSectors: Int,
    totalTracks: Int,
    tracksPerCylinder: Int,
    sectorsPerTrack: Int,
    firmwareRevision: String,
    serialNum: String,
    interfaceType: String,
    smartStatus: String
  }

  type Time{
    current: IntToString,
    uptime: Int,
    timezone: String,
    timezoneName: String
  }

  type CpuCurrentspeed {
    min: Float,
    max: Float,
    avg: Float,
    cores: [String]
  }

  type Temp{
    main: Int,
    cores: [String],
    max: Int
  }

  type Services{
    name: String,
    running: Boolean,
    startMode: String,
    pids: String,
    pcpu: Float,
    pmem: Float
  }

  type CurrentLoad{
    avgload: Float,
    currentload: Float,
    currentload_user: Float,
    currentload_system: Float,
    currentload_nice: Float,
    currentload_idle: Float,
    currentload_irq: Float,
    raw_currentload: Int,
    raw_currentload_user: Int,
    raw_currentload_system: Int,
    raw_currentload_nice: Int,
    raw_currentload_idle: Int,
    raw_currentload_irq: Int,
    cpus: [CPUs]
  }

  type CPUs {
    load: Float,
    load_user: Float,
    load_system: Float,
    load_nice: Float,
    load_idle: Float,
    load_irq: Float,
    raw_load: Int,
    raw_load_user: Int,
    raw_load_system: Int,
    raw_load_nice: Int,
    raw_load_idle: Int,
    raw_load_irq: Int
  }

  type fsSize{
    fs: String,
    type: String,
    size: IntToString,
    used: IntToString,
    use: Float,
    mount: String
  }

  type Mem{
    total: IntToString,
    free: IntToString,
    used: IntToString,
    active: IntToString,
    available: IntToString,
    buffcache: IntToString,
    swaptotal: Int,
    swapused: Int,
    swapfree: Int
  }

  type NetworkConnections{
    protocol: String,
    localaddress: String,
    localport: String,
    peeraddress: String,
    peerport: String,
    state: String
  }

  type NetworkStats{
    iface: String,
    operstate: String,
    rx: IntToString,
    tx: IntToString,
    rx_sec: Float,
    tx_sec: Float,
    ms: Int
  }


  type fsStats{
    rx: IntToString,
    wx: IntToString,
    tx: IntToString,
    rx_sec: Float,
    wx_sec: Float,
    tx_sec: Float,
    ms: Int
  }

  type DisksIO{
    rIO: IntToString,
    wIO: IntToString,
    tIO: IntToString,
    rIO_sec: Float,
    wIO_sec: Float,
    tIO_sec: Float,
    ms: Int
  }

  type Users{
    user: String,
    tty: String,
    date: String,
    time: String,
    ip: String,
    command: String
  }

  type Battery{
    hasbattery: Boolean,
    cyclecount: Int,
    ischarging: Boolean,
    maxcapacity: Int,
    currentcapacity: Int,
    percent: Int,
    timeremaining: Int,
    acconnected: Boolean,
    type: String,
    model: String,
    manufacturer: String,
    serial: String
  }

  type Processes{
    all: Int,
    running: Int,
    blocked: Int,
    sleeping: Int,
    unknown: Int,
    list: [ProcessList]
  }

  type ProcessList{
    pid: Int,
    parentPid: Int,
    name: String,
    pcpu: Float,
    pcpuu: Float,
    pcpus: Float,
    pmem: Float,
    priority: Int,
    mem_vsz: IntToString,
    mem_rss: IntToString,
    nice: Int,
    started: String,
    state: String,
    tty: String,
    user: String,
    command: String
  }
`;
