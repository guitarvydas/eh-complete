from sender import Sender
class SelfSender (Sender):
    def __init__ (self, component, port):
        super ().__init__ (component, port)
