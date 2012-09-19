lessc reset.less reset.less.css
lessc base.less base.less.css
lessc style.less style.less.css

cat reset.less.css base.less.css style.less.css > all.css

rm *.less.css