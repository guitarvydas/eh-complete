from inputmessage import InputMessage
class RouteConnect:
    # from input of Container to input of Child

    def __init__ (self, sender, receiver):
        self._sender = sender
        self._receiver = receiver

    def guardedDeliver (self, inmessage):
        # try to deliver the message
        # deliver only if message's from and port match this connection's sender's from and port, otherwise do nothing
        if (self._sender.match (inmessage.xfrom, inmessage.port)):
            receiver = self._receiver
            sender = self._sender
            print (f'route {inmessage} ... {sender.name ()} -> {receiver.name ()}')
            mappedMessage = InputMessage (self, receiver._port, inmessage.data, inmessage)
            receiver.enqueueInput (mappedMessage)
