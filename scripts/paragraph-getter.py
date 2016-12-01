from HTMLParser import HTMLParser 
import glob 

paragraphs = []

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
      self.verse_nums.append(attrs)
      self.new_paragraph = False

  def handle_endtag(self, tag): 
    if tag == 'html': 
      paragraphs.append(self.verse_nums)

parser = MyHTMLParser() 
for filename in glob.glob('web-html-files/*.htm'): 
  parser.feed(open(filename, 'r').read())

print len(paragraphs)