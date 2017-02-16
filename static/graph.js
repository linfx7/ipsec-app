var localnetwork;
var localgateways = new Map();
var remote = new Map();
var tunnels = new Map();
var graph;

function initLocalNetwork() {
    localnetwork = graph.createNode("Local Network");
    // localNetwork.image = '/static/network.png';
    localnetwork.image = 'Q-cloud';
    localnetwork.size = {width: 370};
    localnetwork.setStyle(Q.Styles.LABEL_OFFSET_Y, -120);
    localnetwork.location = new Q.Point(-350, -25);
}

function addLocalGateway(name, ip) {
    if (localgateways.size === 0) {
        var gw = graph.createNode(name + '\n' + ip);
        gw.image = 'Q-exchanger2';
        gw.size = {width: 60};
        gw.location = new Q.Point(-170, 0);

        localgateways.set(ip, gw);
    } else if (localgateways.size === 1) {
        localgateways.forEach(function(lgw) {
            lgw.location = new Q.Point(-180, -50);
        });

        var gw = graph.createNode(name + '\n' + ip);
        gw.image = 'Q-exchanger2';
        gw.size = {width: 60};
        gw.location = new Q.Point(-180, 50);

        localgateways.set(ip, gw);
    }
}

function removeLocalGateway(ip) {
    graph.graphModel.remove(localgateways.get(ip));
    localgateways.delete(ip);
    localgateways.forEach(function(lgw) {
        lgw.location = new Q.Point(-170, 0);
    });
}

function addRemote(ip) {
    if (remote.size === 0) {
        var rn = graph.createNode('Remote Network');
        // localNetwork.image = '/static/network.png';
        rn.image = 'Q-cloud';
        rn.size = {width: 200};
        rn.setStyle(Q.Styles.LABEL_OFFSET_Y, -73);
        rn.location = new Q.Point(350, -25);

        var gw = graph.createNode(ip);
        gw.image = 'Q-exchanger2';
        gw.size = {width: 60};
        gw.location = new Q.Point(250, -10);

        var tmpo = new Object();
        tmpo.network = rn;
        tmpo.gateway = gw;
        remote.set(ip, tmpo);

    } else if (remote.size === 1) {
        remote.forEach(function(rmto) {
            rmto.network.location = new Q.Point(300, -125);
            rmto.gateway.location = new Q.Point(200, -115);
        });
        
        var rn = graph.createNode('Remote Network');
        // localNetwork.image = '/static/network.png';
        rn.image = 'Q-cloud';
        rn.size = {width: 200};
        rn.setStyle(Q.Styles.LABEL_OFFSET_Y, -73);
        rn.location = new Q.Point(340, 55);

        var gw = graph.createNode(ip);
        gw.image = 'Q-exchanger2';
        gw.size = {width: 60};
        gw.location = new Q.Point(240, 70);

        var tmpo = new Object();
        tmpo.network = rn;
        tmpo.gateway = gw;
        remote.set(ip, tmpo);
    }
}

function removeRemote(ip) {
    graph.graphModel.remove(remote.get(ip).network);
    graph.graphModel.remove(remote.get(ip).gateway);
    remote.delete(ip);

    if (remote.size === 2) {
        remote.forEach(function(rmto) {
            rmto.network.location = new Q.Point(350, -25);
            rmto.gateway.location = new Q.Point(250, -10);
        });
    }
}

function addTunnel(localip, remoteip, conn, key) {
    var edge = graph.createEdge(conn, localgateways.get(localip), remote.get(remoteip).gateway);
    edge.setStyle(Q.Styles.EDGE_COLOR, '#88AAEE');
    edge.setStyle(Q.Styles.EDGE_WIDTH, 5);
    tunnels.set(key, edge);
}

function removeTunnel(key) {
    graph.graphModel.remove(tunnels.get(key));
    tunnels.delete(key);
}

function allTunnels() {
    return tunnels;
}

function initGraph(id) {
    graph = new Q.Graph(id, '');
}