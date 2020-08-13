from pydub import AudioSegment
import os
source_path = 'D://Internship//todo//media//ecbbeab5-322f-45b5-8198-a92dcf3f57e9.mp3'
if not os.path.exists(source_path):    
    raise FileNotFoundError("File not found at path: {0}".format(os.path.realpath(source_path)))
else:
    print('Found')

song = AudioSegment.from_mp3(source_path)
reversesong=song.reverse()
awesome = reversesong
awesome.export(source_path+"reversed.mp3", format="mp3")

