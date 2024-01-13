export default function PostBusinessCard({fetchData}) {
  async function postBusinessCard(e) {
    e.preventDefault();

    const data = new FormData(e.target);
    const jsonData = JSON.stringify({
      name: data.get('name'),
      description: data.get('description'),
      interests: data.get('interest').split('\n'),
      socialLinks: {
        linkedin: data.get('linkedin'),
        facebook: data.get('facebook'),
        instagram: data.get('instagram'),
        twitter: data.get('twitter'),
      }
    });
    console.log(jsonData);
    const res = await fetch('http://localhost:3004/postCard', {
      method: 'POST',
      body: jsonData,
      headers: {
        "Content-Type": 'application/json',
      }
    });
    const resJson = await res.json();
    console.log(resJson);
    fetchData();
  }

  return (
    <div>
      <form onSubmit={postBusinessCard}>
        <label htmlFor="name">Name: </label>
        <input id="name" name="name" title="name" />
        <br />

        <label htmlFor="description">Description: </label>
        <input id="description" name="description" title="description" />
        <br />

        <label htmlFor="interest">Interest: </label>
        <textarea
          id="interest"
          name="interest"
          title="interest"
          placeholder="Add interest with new line"
        ></textarea>
        <br />
        <br />

        <h4>Social Media</h4>
        <label htmlFor="sm1">Linkedin: </label>
        <input id="sm1" name="linkedin" title="Your linkedin profile link" />
        <br />
        <label htmlFor="sm2">Facebook: </label>
        <input id="sm2" name="facebook" title="Your facebook profile link" />
        <br />
        <label htmlFor="sm3">Instagram: </label>
        <input id="sm3" name="instagram" title="Your instagram profile link" />
        <br />
        <label htmlFor="sm4">Twitter: </label>
        <input id="sm4" name="twitter" title="Your twitter profile link" />
        <br />
        <br />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
}
