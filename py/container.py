from sender import Sender
from inputmessage import InputMessage
from outputmessage import OutputMessage
from porthandler import PortHandler
from state import State
from eh import EH

debugRouting = True

class Container (EH):
    def __init__ (self, parent, name, children, connections):
        defaultName = 'default'
        handler = PortHandler ('*', self.handle)
        s = State (machine=self, name=defaultName, enter=None, handlers=[handler], exit=None, childMachine=None)
        super ().__init__ (parent = parent,
                        name = name,
                        defaultStateName = defaultName,
                        enter = self.noop,
                        exit = self.noop,
                        states = [s])

    def noop (self):
        pass

        
    def handle (self, message):
        for connection in self._connections:
            connection.guardedDeliver (message)
        self.runToCompletion ()

    def name (self):
        return self._name
    
# helpers
    def runToCompletion (self):
        while self.anyChildReady ():
            for child in self._children:
                child.handleIfReady ()
                self.routeOutputs (child)

    def anyChildReady (self):
        r = False
        for child in self._children:
            if child.isReady ():
                r = True
        return r

    def routeOutputs (self, child):
        outputs = child.outputQueue ()
        child.clearOutputs ()
        for msg in outputs:
            for conn in self._connections:
                conn.guardedDeliver (msg)
