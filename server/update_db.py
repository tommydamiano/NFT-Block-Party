import tweepy
from time import sleep
import pymongo
from pymongo import MongoClient

cluster = MongoClient('mongodb+srv://tommydamiano:nftblocker@cluster0.smksg.mongodb.net/nftblocker?retryWrites=true&w=majority&ssl=true&ssl_cert_reqs=CERT_NONE')
collection = cluster['nftblocker']['users_to_block_v2']

API_KEY = '18bsO52ETJpwrb5wAzdmZjusg'
API_SECRET_KEY = 'np8NXLf9HCuxpUQfHTqlej1EMIp61vxhIkVTNvqoXA3GcyekSC'
ACCESS_TOKEN = '354084864-83TeWmznqrCUdx9cu7yxRqvynJ7t0YawSMgvbbwZ'
ACCESS_TOKEN_SECRET = 'GnZccUREgkFI6GFjTMxNRonIr61yxtcXyVWRdxTt3Rnmg'
auth = tweepy.OAuthHandler(API_KEY, API_SECRET_KEY)
auth.set_access_token(ACCESS_TOKEN, ACCESS_TOKEN_SECRET)
api = tweepy.API(auth)
name = 'tommydfor3_'

def get_users_to_block_by_user(search_term):
    page = 0
    while page <= 50:  
        users = api.search_users(q= search_term, page= page, count= 20, include_ext_has_nft_avatar= True)
        for user in users:
            insert_user_to_db(user)
        page += 1

def get_users_to_block_by_tweets(search_term):
    tweets = api.search(q= search_term, result_type= 'popular', count= 5000)
    for tweet in tweets:
        user = api.get_user(user_id= tweet.user.id, include_ext_has_nft_avatar= True)
        insert_user_to_db(user)

def insert_user_to_db(user):
    if user.ext_has_nft_avatar is True:
        if collection.find_one({'_id': user.id_str}) is None:
            user_data = {
                '_id': user.id_str,
                'profile_name': user.name,
                'username': user.screen_name,
                'location': user.location,
                'profile_url': f'https://twitter.com/{user.screen_name}',
                'is_verified': user.verified,
                'profile_description': user.description,
                'followers': user.followers_count,
                'favorites': user.favourites_count,
                'acct_created_date': user.created_at,
                'profile_pic_url': user.profile_image_url_https,
                'has_nft_avatar': user.ext_has_nft_avatar
            }
            collection.insert_one(user_data)
            print(user.name, f'https://twitter.com/{user.screen_name}')

if __name__ == '__main__':
    for word in ['nft', 'nft art', 'crypto', 'bitcoin', 'eth', 'ethereum', 'bored ape', 'bored ape yc', 'BAYC', 'cryptopunk', 'web3']:
        get_users_to_block_by_user(word)   #cryptocurrency, crypto, eth, bitcoin, ethereum, blockchain, nft, nft art, bored ape, BAYC, cryptopunk, web3, sol, solana, DAO, DeFi
    for word in ['#BAYC', '#newnftprofilepic', '#nft', '#apefollowape']:
        get_users_to_block_by_tweets(word)
