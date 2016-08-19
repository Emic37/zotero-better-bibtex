var Reconstruct = (function() {
  function Reconstruct(ast) {
    this.html = '';
    this.walk(ast);
  }

  Reconstruct.prototype.walk = function(node) {
    var base, child, i, j, k, len, len1, ref, ref1, ref2, v;
    if (node.name === '#text') {
      this.html += node.text;
      return;
    }
    for (k in node) {
      if (k !== 'children' && k !== 'name' && k !== 'attr' && k !== 'class') {
        (base = node.attr)[k] || (base[k] = '');
      }
    }
    if (node.name === 'span' && Object.keys(node.attr).length === 0) {
      ref = node.children;
      for (i = 0, len = ref.length; i < len; i++) {
        child = ref[i];
        this.walk(child);
      }
      return;
    }
    this.html += "<" + node.name;
    ref1 = node.attr;
    for (k in ref1) {
      v = ref1[k];
      this.html += " " + k + "='" + v + "'";
    }
    this.html += '>';
    ref2 = node.children;
    for (j = 0, len1 = ref2.length; j < len1; j++) {
      child = ref2[j];
      this.walk(child);
    }
    return this.html += "</" + node.name + ">";
  };

  return Reconstruct;

})();
