  function stacktop (stack) {
      var len = stack.length;
      return stack [len - 1];
  }

  function stackpop (stack) {
      stack.pop ();
  }
  
  function stackreset (stack) {
      stack = [];
  }

  function settop (stack, val) {
      var len = stack.length;
      stack [len - 1] = val;
  }

