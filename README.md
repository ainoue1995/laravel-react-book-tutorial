# 手順

## 1. git clone

```
git clone https://github.com/ainoue1995/laravel-react-book-tutorial.git
cd laravel-react-book-tutorial
```


## 2. イメージ作成

```
docker-compose build
```

## 3. ライブラリのインストール

```
docker-compose run --rm node sh -c 'cd sample_app && yarn'
```

## 4. アプリケーション実行

```
docker-compose up
```

Ctl + Cでアプリケーションストップ
