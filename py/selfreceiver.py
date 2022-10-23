from receiver import Receiver
class SelfReceiver (Receiver):
    def __init__ (self, component, port):
        super ().__init__ (component, port)
        
