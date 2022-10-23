  function fixupCode (s) {
      var fixed = s.replace (/,]/g,']').replace (/,\-\)]/g,'\n-)]').replace (/,⟩]\n]/g,']\n]').replace (/\n\n+/g, '\n');
      return fixed;
  }
