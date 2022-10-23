from inputmessage import InputMessage
from generated import HelloWorld
hw = HelloWorld (None, '❲HelloWorld instance❳')
hw.inject (InputMessage (hw, 'stdin', True, None))
hw.run ()
print ()
print (hw.outputsLIFODictionary ())
print (hw.outputsFIFODictionary ())
