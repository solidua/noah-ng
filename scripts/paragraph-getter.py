from HTMLParser import HTMLParser 
import json 
import glob 

paragraphs = []
chapter_num = 0

class MyHTMLParser(HTMLParser):
  def __init__(self): 
    HTMLParser.__init__(self)
    self.new_paragraph = False; 
    self.verse_nums = []

  def handle_starttag(self, tag, attrs): 
    if tag == 'div': 
      if attrs[0][1] == 'p': 
        self.new_paragraph = True 
    if tag == 'span' and self.new_paragraph: 
      self.verse_nums.append(int(attrs[1][1][1:]))
      self.new_paragraph = False

  def handle_endtag(self, tag): 
    if tag == 'html': 
      paragraphs.append({chapter_num : self.verse_nums})

parser = MyHTMLParser() 
for i, filename in enumerate(glob.glob('web-html-files/*.htm')): 
  chapter_num = i + 1
  f = open(filename,'r')
  parser.feed(f.read())
  parser = MyHTMLParser() 
  f.close()

with open('paragraphs.json', 'w') as outfile: 
  json.dump(paragraphs, outfile)
