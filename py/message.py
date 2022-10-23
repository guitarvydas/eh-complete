# Message =
# | Sender Port Message State Trail -- encapsulated
# | Base                            -- bottom


class BaseMessage:
    def __init__ (self, data):
        self._data = data
    def __repr__ (self):
        return "%s" % (self._data)
    @property
    def data (self):
        return self._data

class Message (BaseMessage):
    def __init__ (self, xfrom, port, data, trail):
        super ().__init__ (data)
        self._xfrom = xfrom
        self._port = port
        self._trail = trail

    def __repr__ (self):
        return "<??? (Error, this is a virtual message and should never be seen): '%s','%s'>" % (self.port, self.data)

    @property
    def xfrom (self):
        return self._xfrom

    @property
    def port (self):
        return self._port

    @property
    def trail (self):
        return self._trail
