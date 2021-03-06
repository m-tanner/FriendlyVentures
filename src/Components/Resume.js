import React, {Component} from 'react';
import dompurify from 'dompurify';


class Resume extends Component {
    render() {

        const sanitizer = dompurify.sanitize;
        const config = { ALLOWED_TAGS: ['p', 'a', '#text'], ADD_ATTR: ['target', 'rel'], KEEP_CONTENT: false };


        if (this.props.data) {
            var education = this.props.data.education.map(function (education) {
                return <div key={education.school}><h3>{education.school}</h3>
                    <p className="info">{education.degree} <span>&bull;</span><em
                        className="date">{education.graduated}</em></p>
                    <p>{education.description}</p></div>
            })
            var work = this.props.data.work.map(function (work) {
                return <div key={work.company}><h3>{work.company}</h3>
                    <p className="info">{work.title}<span>&bull;</span> <em className="date">{work.years}</em></p>
                    <p>{work.description}</p>
                </div>
            })
            var sides = this.props.data.sides.map(function (sides) {
                return <div key={sides.company}><h3>{sides.company}</h3>
                    <p dangerouslySetInnerHTML={{ __html: sanitizer(sides.description, config)}}/>
                </div>
            })
        }

        return (
            <section id="resume">

                <div className="row work">

                    <div className="three columns header-col">
                        <h1><span>Work</span></h1>
                    </div>

                    <div className="nine columns main-col">
                        {work}
                    </div>
                </div>

                <div className="row sides">

                    <div className="three columns header-col">
                        <h1><span>Side Projects</span></h1>
                    </div>

                    <div className="nine columns main-col">
                        {sides}
                    </div>
                </div>


                <div className="row education">
                    <div className="three columns header-col">
                        <h1><span>Education</span></h1>
                    </div>

                    <div className="nine columns main-col">
                        <div className="row item">
                            <div className="twelve columns">
                                {education}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Resume;
