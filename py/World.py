from porthandler import PortHandler
from procedure import Procedure

class World (Procedure):
    def f1 (self, message):
        self.send (self, 'stdout', message.data, message)
        self.send (self, 'stdout', 'world', message)

    def __init__ (self, parent, name):
        h1 = PortHandler ('*', self.f1)
        super ().__init__ (parent=parent, name=name, portHandler=h1)
