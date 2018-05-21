export const CartoDBImageryProvider = Cesium.createOpenStreetMapImageryProvider;

CartoDBImageryProvider.prototype.getCDNSubdomain = function (x, y) {  // Multi-WMS server selection
  const subdomains = ['a', 'b', 'c', 'd'];
  return subdomains[(x + y) % subdomains.length];
};

CartoDBImageryProvider.prototype.requestImage = function (x, y, level) {
  const url = this._url.replace('{s}', this.getCDNSubdomain(x, y)).replace('{z}', level).replace('{x}', x).replace('{y}', y);
  return Cesium.ImageryProvider.loadImage(this, url);
};
